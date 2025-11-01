const EmptyState = () => {
    return (
        <div
            style={{textAlign: "center", padding: "60px 0", color: "#aaa", fontSize: "18px"}}>
            <p>No movies yet.</p>
            <p style={{ color: "#e50914", fontWeight: "bold" }}>
                Start building your watchlist
            </p>
        </div>
    );
};

export default EmptyState;
