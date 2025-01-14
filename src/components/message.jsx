
const Message = ({ notification }) => {
    return (
        <>
            <div id="notificationHeader" style={{
                display: flex,
                justifyContent: "space-around",
                alignItems: center,
                fontSize: '20px',
                fontWeight: bold,
            }}>
                {notification.image && (
                    <div id="imageContainer" style={{
                        display: flex,
                        alignItems: center,
                        height: '100px',
                        objectFit: contain,
                    }} >
                        <img src={notification.image} width={100} />
                    </div>
                )}
                <span>{notification.title}</span>
            </div >
            <div id="notificationBody" style={{
                marginTop: '10px',
                textAlign: center,
            }}>{notification.body}</div>
        </>
    );
};

export default Message;