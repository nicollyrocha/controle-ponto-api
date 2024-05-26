import { server } from './server/Server';

const port = process.env.PORT || 3333;

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
