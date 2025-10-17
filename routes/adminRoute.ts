import express from "express";
import { ensureAdmin } from "../middleware/checkAuth";

const router = express.Router();

// GET admin dashboard - only admins can access
router.get("/", ensureAdmin, (req, res) => {
    const sessionStore = req.sessionStore;

    if (!sessionStore || typeof sessionStore.all !== 'function') {
        return res.status(500).send("Session store does not support listing all sessions.");
    }

    // Get all sessions
    sessionStore.all((err: any, sessions: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving sessions");
        }

        // Format sessions for display
        const sessionIds = Object.keys(sessions || {});

        const formattedSessions = sessionIds.map((sessionId) => {
            const session = sessions[sessionId];
            const userId = session.passport?.user;

            return {
                id: sessionId,
                userId: userId || "N/A",
                userName: userId ? `User ${userId}` : "N/A",
            };
        });

        res.render("admin", { sessions: formattedSessions });
    });
});

// POST revoke session - destroy a specific session
router.post("/revoke/:sessionId", ensureAdmin, (req, res) => {
    const sessionId = req.params.sessionId;
    const sessionStore = req.sessionStore;

    if (!sessionStore) {
        return res.status(500).send("Session store not available");
    }

    sessionStore.destroy(sessionId, (err: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error revoking session");
        }

        res.redirect("/admin");
    });
});

export default router;