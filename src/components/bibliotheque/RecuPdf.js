import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';

// Create Document Component
const RecuPdf = (props) => {

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
    sousItemGauche: {
      width: 95,
      textAlign: 'left',
    },
    sousItemDroit: {
      width: 90,
      textAlign: 'left',
    },
    text: {
      fontSize: 12,
    },
    montant: {
      fontWeight: 'bold',
      fontSize: 15
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.section, {marginLeft: '95px'}]}>
          <View style={styles.header} >
            <Text style={styles.title} >Reçu d'inscription</Text>
          </View>
          <View style={{height: 50}} >
            <Text style={styles.text} >Délivré par :</Text>
            <Text style={[styles.text, {color: 'gray'}]} >Bibliothèque EPT</Text>
            <Text style={[styles.text, {color: 'blue'}]} >M. Diaw</Text>
          </View>
          <View style={styles.item} >
            <View style={styles.sousItemGauche} >
              <Text style={[styles.text, {height: 50}]} >Objet : </Text>
              <Text style={styles.text} >Année Scolaire : </Text>
            </View>
            <View style={styles.sousItemDroit} >
              <Text style={[styles.text, {height: 50, color: 'gray'}]} >Inscription à la bibliothèque</Text>
              <Text style={[styles.text, {color: 'blue'}]} >2019/2020</Text>
            </View>
          </View>
          <View style={styles.item} >
            <View style={{paddingTop: '10px'}} >
              <Text style={styles.text} >Lieu, date : </Text>
              <Text style={[styles.text, {color: 'blue'}]} >Thiès, {props.recu.date}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section, {marginRight: '75px'}]}>
          <View style={styles.header} >
              <Text style={styles.text} >N° de reçu :</Text>
              <Text style={[styles.text, {color: 'blue'}]} >{props.recu.id}</Text>
          </View>
          <View style={{height: 50}} >
            <Text style={styles.text} >Délivré à :</Text>
              <Text style={[styles.text, {color: 'blue'}]} >{props.etudiant.nom_complet}</Text>
              <Text style={[styles.text, {color: 'blue'}]} >{props.recu.etudiant}</Text>
          </View>
          <View style={styles.item} >
            <View style={{paddingTop: '17px'}} >
              <Text style={styles.montant} >Montant : </Text>
              <Text style={[styles.montant, {color: 'blue'}]} >1000 F</Text>
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

export default RecuPdf;