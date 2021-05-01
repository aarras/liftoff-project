import React from 'react';

const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
}

export class DateComponent extends React.Component {
    constructor(props) {
        super(props);   
        
        var today = new Date(),
            date = today.getDate();

        this.handleLoad = this.handleLoad.bind(this);
        
        this.state = {
            todaysDate: date
        };
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    handleLoad = (e) => {
        e.preventDefault()
        var dayOfWeek = days;
        var todaysDayOfWeek = "";

        if(this.state.todaysDate > 0) {

            for (var i = 0; i < dayOfWeek.length; i++) {
                console.log("for fired");
                if (this.state.todaysDate === dayOfWeek[i]) {
                    todaysDayOfWeek = dayOfWeek[i];
                    console.log("if fired");
                }
                this.setState(todaysDayOfWeek);
            }
        }
    }


    render() {
        return (
            <div>
                <p>{ this.state.todaysDate }</p>
            </div>
        )
    }

}

export default DateComponent;