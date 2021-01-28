import React, { useState,useEffect } from "react";

import {
    CCardBody,
    CCardHeader,
} from '@coreui/react'

import {connect} from "react-redux"
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        margin: "auto",
        borderRadius: spacing(2), // 16px
        transition: "0.3s",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        position: "relative",
        maxWidth: 500,
        marginLeft: "auto",
        overflow: "initial",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: spacing(2),
        [breakpoints.up("md")]: {
            flexDirection: "row",
            paddingTop: spacing(2)
        }
    },
    media: {
        width: "88%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: spacing(-3),
        height: 0,
        paddingBottom: "48%",
        borderRadius: spacing(2),
        backgroundColor: "#fff",
        position: "relative",
        [breakpoints.up("md")]: {
            width: "100%",
            marginLeft: spacing(-3),
            marginTop: 0,
            transform: "translateX(-8px)"
        },
        "&:after": {
            content: '" "',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(150deg, blue 0%, white 74%)",
            borderRadius: spacing(2), // 16
            opacity: 0.6
        }
    },
    content: {
        padding: 24
    },
    cta: {
        marginTop: 24,
        textTransform: "initial"
    }
}));

const BlogCardDemo = React.memo(function BlogCard(props) {
    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    return (
        <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
                className={styles.media}
                image={
                    "https://community.adobe.com/legacyfs/online/1475181_PDF%20-%20Large.png"
                }
            />
            <CardContent>
                <TextInfoContent
                    classes={contentStyles}
                    overline={"publié le " + props.rapportConcours.date_pub}
                    heading={props.rapportConcours.titre_rapport}
                    body={
                        "Rapport du " + props.rapportConcours.date_rapport
                    }
                />
                <a className="btn btn-outline-primary fas fa-eye" href={props.rapportConcours.rapport_file}>Ouvrir</a>
            </CardContent>
        </Card>
    );
});

const Vue_Liste_Rapport = (props) => {
    let n = 1
    if (props.listRapportIsHere){
        let s = 12 / props.listRapport.length
        n = parseInt(s);
    }

    return(
        <>
            <CCardHeader>
                Liste des Rapports
            </CCardHeader>
            <CCardBody>
                <div className="row">
                    {props.listRapportIsHere ? (
                        <>
                            {props.listRapport.length > 0 ? (
                                props.listRapport.map(s => {
                                    return <div className={"col-md-" + n}><BlogCardDemo rapportConcours={s}/></div>
                                })
                            ):<>
                                <h1>Aucun rapport disponible</h1>
                            </>}

                        </>
                    ):(
                        <h1>No Rapport yet!👶👶</h1>
                    )}
                </div>
            </CCardBody>
       </>
    )

}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps,null)(Vue_Liste_Rapport)