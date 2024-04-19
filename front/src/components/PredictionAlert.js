function PredictionAlert(props){
    return (
        

        <div className="alert alert-dismissible" role="alert">
        <strong>Toxicity level</strong> {props.prediction}
        <button type="button" 
            className="close" data-dismiss="alert" aria-label="Close" onClick={props.onClick}>
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    );
}

export default PredictionAlert;