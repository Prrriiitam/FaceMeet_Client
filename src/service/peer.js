class PeerService {
  constructor() {
    this.peer = null;
  }

  createPeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    return this.peer;
  }

  async getOffer(stream) {
    this.createPeer(); // ✅ reset peer instance
    stream.getTracks().forEach(track => {
      this.peer.addTrack(track, stream);
    });

    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }

  async getAnswer(offer, stream) {
    this.createPeer(); // ✅ reset peer instance
    stream.getTracks().forEach(track => {
      this.peer.addTrack(track, stream);
    });

    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(ans);
    return ans;
  }

  async setRemoteDescription(desc) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(desc));
  }
}

export default new PeerService();
