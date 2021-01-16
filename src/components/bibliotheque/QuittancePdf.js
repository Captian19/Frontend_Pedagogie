import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

// Create Document Component
const QuittancePdf = (props) => {

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      border: '2px solid black'
    },
    section: {
      width: 210,
      textAlign: 'center',
      height: 325,
      paddingTop: '10px',
      paddingLeft: '10px',
      backgroundColor: '#E4E4E4',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20
    },
    header: {
      height: 50,
    },
    item: {
      flexDirection: 'row',
      width: 200,
      height: 90,
      padding: '5px',
    },
    text: {
      fontSize: 12,
    }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, {marginLeft: '95px'}]}>
          <View style={styles.header} >
            <Text style={styles.title} >Quitus</Text>
          </View>
          <View style={{height: 50}} >
            <Text style={styles.text} >Délivré par :</Text>
            <Text style={[styles.text, {color: 'gray'}]} >Bibliothèque EPT</Text>
          </View>
          <View style={styles.item} >
            <View style={{paddingTop: '17px'}} >
              <Text style={styles.text} >Objet : </Text>
              <Text style={[styles.text, {color: 'gray'}]} >Certifie que 
                    l'élève est en règle avec la bibliothèque</Text>
            </View>
          </View>
          <View style={styles.item} >
            <View style={{paddingTop: '10px'}} >
              <Text style={styles.text} >Lieu, date : </Text>
              <Text style={[styles.text, {color: 'blue'}]} >Thiès, {props.quittance.date}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section, {marginRight: '75px'}]}>
          <View style={styles.header} >
              <Text style={styles.text} >N° de quittance :</Text>
              <Text style={[styles.text, {color: 'blue'}]} >{props.quittance.id}</Text>
          </View>
          <View style={{height: 50}} >
            <Text style={styles.text} >Délivré à :</Text>
              <Text style={[styles.text, {color: 'blue'}]} >{props.etudiant.nom_complet}</Text>
              <Text style={[styles.text, {color: 'blue'}]} >{props.quittance.etudiant}</Text>
          </View>
          <View style={styles.item} >
            <View style={{paddingTop: '17px'}} >
                <Text style={styles.text} >Année Scolaire : </Text>
                <Text style={[styles.text, {color: 'blue'}]} >2019/2020</Text>
            </View>
          </View>
          <View style={styles.item} >
            <View style={{paddingTop: '10px'}} >
              <Text style={styles.montant} >Signature : </Text>
              <Text style={[styles.text, {color: 'gray'}]} >Le bibliothecaire</Text>
              {/* <View >
                <Image src={photo_signature} ></Image>
              </View> */}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

};

export default QuittancePdf;