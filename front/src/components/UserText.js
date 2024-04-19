import "./UserText.css";

export function UserText(props) {
  return (
    <textarea
      className="center"
      onChange={props.videoId}
      onBlur={props.videoId}
      placeholder="Type video id here..."
    ></textarea>
  );
}
