import { APIGatewayProxyHandler } from 'aws-lambda';

// モックデータ
const tasks = [
  { id: 1, title: '勉強' },
  { id: 2, title: '読書' },
];

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // 本来はここでDBアクセスなどを行う
  console.log('Lambda handler called');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // CORS設定
    },
    body: JSON.stringify(tasks),
  };
};
