import { useParams } from 'react-router-dom';

const AnecdoteDetail = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find(a => a.id === Number(id));

  if (!anecdote) return <p>Anecdote not found</p>;

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Info: <a href={anecdote.info}>{anecdote.info}</a></p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  );
};

export default AnecdoteDetail;
