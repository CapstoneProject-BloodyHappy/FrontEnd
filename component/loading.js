import { Spinner } from "react-bootstrap"

const Loading = () => {
    return (
        <div style={{zIndex: 3, width: "100vw", height: "calc(100vh - 60px)", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Spinner animation="border" role="status" style={{width:'50px', height:'50px', color: '#DC2228'}}/>
        </div>
    )
}

export default Loading