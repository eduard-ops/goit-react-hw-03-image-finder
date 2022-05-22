export default function Button({ onLoadMore }) {
  return (
    <button onClick={onLoadMore} className="load-more-btn btn">
      Load more
    </button>
  );
}
