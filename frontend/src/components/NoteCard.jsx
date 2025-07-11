const NoteCard = ({ note }) => {
  return (
    <div className="card-body">
      <h3 className="card-title text-base-content">{note.title}</h3>
      <p className="text-base-content/70 line-clamp-3">{note.content}</p>
    </div>
  );
};

export default NoteCard;
