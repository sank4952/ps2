import { useLocation } from 'react-router-dom';
function Results(){
    const location = useLocation();
    const { topic, maxque,rollno,score } = location.state || {};
    console.log(rollno,topic,maxque);
    return(
        <>
        <h1>{rollno} {topic} {score} </h1>
        </>
    )
}
export default Results;