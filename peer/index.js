import { PeerServer } from 'peer';

const peerServer = PeerServer({
  port: 9000,
  path: "/p2p",
}, () => {
  console.log('p2p server listening');
});
