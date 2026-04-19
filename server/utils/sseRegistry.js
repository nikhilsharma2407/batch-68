/**
 * In-memory SSE client registry.
 * Structure: Map<username, Set<{ sessionId, res }>>
 */
const registry = new Map();

// pending debounce timers per username
const pendingNotifications = new Map();

const logActiveClients = () => {
    console.log('\n=== Active SSE Clients ===');
    if (registry.size === 0) {
        console.log('No active clients');
    } else {
        for (const [username, sessions] of registry.entries()) {
            console.log(`User: ${username} - ${sessions.size} session(s)`);
            for (const client of sessions) {
                console.log(`  └─ Session: ${client.sessionId}`);
            }
        }
    }
    console.log('========================\n');
};

export const registerClient = (username, sessionId, res) => {
    if (!registry.has(username)) registry.set(username, new Set());
    const client = { sessionId, res };
    registry.get(username).add(client);
    console.log(`[SSE] Client connected - User: ${username}, Session: ${sessionId}`);
    logActiveClients();
    return client;
};

export const removeClient = (username, client) => {
    const sessions = registry.get(username);
    if (!sessions) return;
    sessions.delete(client);
    if (sessions.size === 0) registry.delete(username);
    console.log(`[SSE] Client disconnected - User: ${username}, Session: ${client.sessionId}`);
    logActiveClients();
};

/**
 * Notify all sessions of a user EXCEPT the one that triggered the update.
 * Debounced — multiple rapid calls collapse into a single SSE event.
 * 
 * @param {string} username - The user whose sessions should be notified
 * @param {string} senderSessionId - The session that triggered the update (excluded from notification)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 500ms)
 * 
 * Why debounce? When a user rapidly adds/removes items (e.g., clicking increment 5 times),
 * we don't want to spam other sessions with 5 separate SSE events. Instead, we wait 500ms
 * and send a single "cart-updated" event, letting the client refetch the latest state once.
 */
export const notifyOtherSessions = (username, senderSessionId, debounceMs = 500) => {
    const existing = pendingNotifications.get(username);
    if (existing) clearTimeout(existing.timer);

    // always keep the latest senderSessionId so the correct session is excluded
    const timer = setTimeout(() => {
        const latest = pendingNotifications.get(username);
        pendingNotifications.delete(username);
        const sessions = registry.get(username);
        if (!sessions) return;
        for (const client of sessions) {
            if (client.sessionId !== latest.senderSessionId) {
                client.res.write(`event: cart-updated\ndata: {}\n\n`);
            }
        }
    }, debounceMs);

    pendingNotifications.set(username, { timer, senderSessionId });
};
