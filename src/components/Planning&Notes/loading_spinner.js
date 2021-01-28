import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import PropTypes from 'prop-types';

// Some styling
const blueColor = "#2699FB";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoadingSpinner(props) {

    return (<div className="sweet-loading">
        <ClipLoader
            css={override}
            size={props.size ?? 150}
            color={"#123abc"}
            loading={props.loading}
        />
    </div>)

}
LoadingSpinner.prototype = {
    loading: PropTypes.bool.isRequired
};