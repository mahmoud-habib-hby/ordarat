
export function Error({ message }) {
    return (
        <div className="bg-danger bg-opacity-50 p-2" role="alert" style={{borderLeft:"5px solid red"}}>
            {message}
        </div>
    );
}