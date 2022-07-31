import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const SERVER_KEY = process.env.SERVER_KEY;
const SERVER_SECRET = process.env.SERVER_SECRET;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/join/:username', (req: Request, res: Response) => {
    const roomName = 'name-of-room';
    const participantName = req.params.username;

    const at = new AccessToken(SERVER_KEY, SERVER_SECRET, {
        identity: participantName,
        ttl: '10 days'
    });

    at.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
    });

    const token = at.toJwt();
    res.json({
        ok: true,
        data: {
            token: token,
            participantName: participantName,
            roomName: roomName,
        },
    });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
