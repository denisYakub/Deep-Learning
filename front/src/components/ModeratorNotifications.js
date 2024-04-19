import "./ModeratorNotifications.css";

export function ModeratorNotifications({text, onClick}) {
  let impression;
  switch (text.length) {
    case 1:
      impression = "🤔";
      break;
    case 2:
      impression = "🤨";
      break;
    case 3:
      impression = "😯";
      break;
    case 4:
      impression = "😠";
      break;
    case 5:
      impression = "😡";
      break;
    case 6:
      impression = "🤬";
      break;
    default:
      impression = "😀";
  }
  
  const toxicityItems = text.map((item, key) => (
    <div key={key} className="toxicity-item">
    {item}
    </div>
  ));
  return (
    <>
    {toxicityItems.length === 0 
    ? <div className="notifications-wrapper">{impression} <div className="toxicity-item">{"antitoxic"}</div> </div> 
    : <div className="notifications-wrapper">{impression} {toxicityItems} </div> }
    </> 
  );
}

export default ModeratorNotifications;