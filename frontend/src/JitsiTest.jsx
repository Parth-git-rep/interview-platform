import { JitsiMeeting } from "@jitsi/react-sdk";

function JitsiTest() {
  return (
    <JitsiMeeting
      roomName="my-test-room-12345"
      getIFrameRef={function(node) { node.style.height = "600px"; }}
    />
  );
}

export default JitsiTest;