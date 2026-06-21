import express from 'express';
import cors from 'cors';
import { handler as getTasksHandler } from './src/handlers/getTasks';
import { APIGatewayProxyResult } from 'aws-lambda';

const app = express();
app.use(express.json());
app.use(cors()); // CORSを許可

const PORT = 3001; // フロントエンドとは別のポート

// GET /tasks へのリクエストをgetTasksハンドラに渡す
app.get('/tasks', async (req, res) => {
  console.log('Local server received request for /tasks');

  try {
    // API Gatewayのイベントオブジェクトを模倣してハンドラを呼び出す
    const response = await getTasksHandler({} as any, {} as any, () => {}) as APIGatewayProxyResult;

    if (response.headers) {
      res.set(response.headers);
    }
    res.status(response.statusCode).send(response.body);

  } catch (error) {
    console.error('Error executing handler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}`);
});
