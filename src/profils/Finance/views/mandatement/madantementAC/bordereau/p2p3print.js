import React from "react";
import ReactToPrint from "react-to-print";
import Page2 from "./page2";
import Page3 from "./page3";


class p1p2print extends React.PureComponent {
    render() {
        return (
            <div>
                <Page2 ref={el => (this.componentRef = el)} />
                <Page3 ref={el => (this.componentRef = el)} />
                <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <button className="btn btn--radius-2 btn--blue" >Imprimer</button>;
                    }}
                    content={() => this.componentRef}
                />

            </div>
        );
    }
}