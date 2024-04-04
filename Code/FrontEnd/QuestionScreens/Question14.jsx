//
//  Question12.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/09/24
//

import React, { useState } from 'react';
import { TextInput, SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question14 = ({ navigation }) => 
  {
    const [selectedAllergies, setSelectedAllergies] = useState({});
    const { saveAnswer } = useAnswers();
    const [searchQuery, setSearchQuery] = useState('');
    const totalQuestions = 31; 
    const currentQuestion = 14;

    const allergyOptions = [
      { id: '1', label: 'Diabetes mellitus type 1', value: 'diabetes_type_1', description: 'A chronic condition with no insulin production.' },
      { id: '2', label: 'Diabetes mellitus type 2', value: 'diabetes_type_2', description: 'A chronic condition with insulin resistance.' },
      { id: '3', label: 'Gestational diabetes', value: 'gestational_diabetes', description: 'High blood sugar during pregnancy.' },
      { id: '4', label: 'Prediabetes', value: 'prediabetes', description: 'Elevated blood sugar not yet high enough for diabetes diagnosis.' },
      { id: '5', label: 'Hypertension', value: 'hypertension', description: 'High blood pressure, a risk for heart disease and stroke.' },
      { id: '6', label: 'Hypercholesterolemia', value: 'hypercholesterolemia', description: 'High cholesterol levels in the blood.' },
      { id: '7', label: 'Cardiovascular disease', value: 'cardiovascular_disease', description: 'Conditions affecting the heart and blood vessels.' },
      { id: '8', label: 'Obesity', value: 'obesity', description: 'Excess body fat that can lead to health issues.' },
      { id: '9', label: 'Metabolic syndrome', value: 'metabolic_syndrome', description: 'A cluster of conditions increasing heart risk.' },
      { id: '10', label: 'Atherosclerosis', value: 'atherosclerosis', description: 'Arteries narrowed by fatty deposits.' },
      { id: '11', label: 'Gout', value: 'gout', description: 'Arthritis caused by uric acid crystal buildup in joints.' },
      { id: '12', label: 'Kidney stones', value: 'kidney_stones', description: 'Hard deposits formed in kidneys.' },
      { id: '13', label: 'NAFLD', value: 'nafld', description: 'Fat buildup in the liver.' },
      { id: '14', label: 'Cirrhosis', value: 'cirrhosis', description: 'Liver scarring due to long-term damage.' },
      { id: '15', label: 'Crohn\’s disease', value: 'crohns_disease', description: 'Inflammatory bowel disease causing digestive tract inflammation.' },
      { id: '16', label: 'Ulcerative colitis', value: 'ulcerative_colitis', description: 'Chronic IBD causing colon inflammation and ulcers.' },
      { id: '17', label: 'IBS', value: 'ibs', description: 'Bowel disorder causing pain and discomfort.' },
      { id: '18', label: 'Celiac disease', value: 'celiac_disease', description: 'Immune reaction to eating gluten.' },
      { id: '19', label: 'Food allergies', value: 'food_allergies', description: 'Immune system reaction to certain foods.' },
      { id: '20', label: 'Gluten sensitivity', value: 'gluten_sensitivity', description: 'Reactions to gluten without celiac disease.' },
      { id: '21', label: 'GERD', value: 'gerd', description: 'Acid reflux and heartburn.' },
      { id: '22', label: 'IBD', value: 'ibd', description: 'Inflammatory conditions of the digestive tract.' },
      { id: '23', label: 'PCOS', value: 'pcos', description: 'Hormonal disorder affecting ovaries.' },
      { id: '24', label: 'Osteoporosis', value: 'osteoporosis', description: 'Bones become brittle and fragile.' },
      { id: '25', label: 'Malnutrition', value: 'malnutrition', description: 'Lack of sufficient nutrients for good health.' },
      { id: '26', label: 'Anorexia nervosa', value: 'anorexia_nervosa', description: 'Eating disorder leading to severe weight loss.' },
      { id: '27', label: 'Bulimia nervosa', value: 'bulimia_nervosa', description: 'Eating disorder characterized by binge eating followed by purging.' },
      { id: '28', label: 'Binge eating disorder', value: 'binge_eating_disorder', description: 'Eating disorder with recurrent episodes of eating large quantities of food.' },
      { id: '29', label: 'Hypothyroidism', value: 'hypothyroidism', description: 'An underactive thyroid causing slow metabolism, managed with hormone therapy and diet.' },
      { id: '30', label: 'Hyperthyroidism', value: 'hyperthyroidism', description: 'An overactive thyroid increasing metabolism, requiring dietary adjustments and treatment.' },
      { id: '31', label: 'Phenylketonuria (PKU)', value: 'pkU', description: 'A condition affecting amino acid breakdown, requiring a phenylalanine-restricted diet.' },
      { id: '32', label: 'Cystic Fibrosis', value: 'cysticFibrosis', description: 'A genetic disorder affecting lungs and digestion, needing specific dietary plans.' },
      { id: '33', label: 'Epilepsy (Ketogenic Diet)', value: 'epilepsy', description: 'A neurological condition where a ketogenic diet may help manage seizures.' },
      { id: '34', label: 'Lactose Intolerance', value: 'lactoseIntolerance', description: 'Difficulty digesting lactose, often requiring a lactose-free diet.' },
      { id: '35', label: 'Fructose Malabsorption', value: 'fructoseMalabsorption', description: 'Difficulty absorbing fructose, necessitating dietary restrictions.' },
      { id: '36', label: 'Phenylketonuria (PKU)', value: 'pkU2', description: 'A condition requiring management of phenylalanine intake.' },
      { id: '37', label: 'Wilson\'s Disease', value: 'wilsonsDisease', description: 'A disorder leading to copper accumulation, requiring dietary management.' },
      { id: '38', label: 'Hemochromatosis', value: 'hemochromatosis', description: 'A condition causing iron overload, managed through diet and phlebotomy.' },
      { id: '39', label: 'Porphyria', value: 'porphyria', description: 'A group of disorders affecting the skin or nervous system, some forms influenced by diet.' },
      { id: '40', label: 'Sickle Cell Disease', value: 'sickleCell', description: 'A blood disorder with various symptoms, dietary considerations are supportive.' },
      { id: '41', label: 'G6PD Deficiency', value: 'g6pdDeficiency', description: 'An enzyme deficiency causing hemolytic anemia, certain foods must be avoided.' },
      { id: '42', label: 'Galactosemia', value: 'galactosemia', description: 'A disorder preventing metabolism of galactose, requires lactose-free diet.' },
      { id: '43', label: 'Histamine Intolerance', value: 'histamineIntolerance', description: 'Difficulty breaking down histamine in foods, requiring dietary adjustments.' },
      { id: '44', label: 'Gastrointestinal Motility Disorders', value: 'gastroMotilityDisorders', description: 'Conditions affecting digestive tract movement, necessitating dietary changes.' },
      { id: '45', label: 'Gastroparesis', value: 'gastroparesis', description: 'Delayed stomach emptying, diet must be tailored to accommodate slow digestion.' },
      { id: '46', label: 'Allergic Rhinitis', value: 'allergicRhinitis', description: 'Nasal allergies that can be impacted by diet, especially food additives.' },
      { id: '47', label: 'Eosinophilic Esophagitis', value: 'eosinophilicEsophagitis', description: 'An allergic inflammatory condition of the esophagus, dietary triggers vary.' },
      { id: '48', label: 'Mast Cell Activation Syndrome', value: 'mcas', description: 'Excessive activation of mast cells, can lead to varied dietary sensitivities.' },
      { id: '49', label: 'Oral Allergy Syndrome', value: 'oralAllergySyndrome', description: 'Reactions to certain raw fruits and vegetables, often linked to pollen allergies.' },
      { id: "50", "label": "Osteogenesis imperfecta (Brittle bone disease)", value: "osteogenesis_imperfecta", description: "A genetic condition leading to bones that break easily, requiring careful dietary management to ensure bone health." },
      { id: "51", label: "Phenylketonuria (PKU)", value: "phenylketonuria", description: "A metabolic disorder that increases the levels of phenylalanine in the blood, requiring a diet low in this amino acid." },
      { id: "52", label: "Wilson's disease", value: "wilsons_disease", description: "A rare genetic disorder that causes copper poisoning in the body, requiring a copper-restricted diet." },
      { id: "53", label: "Hemochromatosis", value: "hemochromatosis", description: "An iron overload disorder requiring a diet low in iron to prevent organ damage." },
      { id: "54", label: "Porphyria", value: "porphyria", description: "A group of disorders that can cause nerve or skin problems, with some forms requiring dietary modifications." },
      { id: "55", label: "Sickle cell disease", value: "sickle_cell_disease", description: "A group of inherited red blood cell disorders, with dietary considerations to manage symptoms and complications." },
      { id: "56", label: "G6PD deficiency", value: "g6pd_deficiency", description: "A genetic condition leading to the breakdown of red blood cells, requiring avoidance of certain foods and medications." },
      { id: "57", label: "Galactosemia", value: "galactosemia", description: "A condition where galactose builds up in the blood, requiring the exclusion of lactose and galactose from the diet." },
      { id: "58", label: "Histamine intolerance", value: "histamine_intolerance", description: "A condition where histamine isn't properly broken down, leading to symptoms that may be alleviated with dietary changes." },
      { id: "59", label: "Gastrointestinal motility disorders", value: "gastrointestinal_motility_disorders", description: "Disorders affecting the movement of the digestive tract, requiring dietary adjustments for symptom management." },
      { id: "60", label: "Gastroparesis", value: "gastroparesis", description: "A condition that affects the normal spontaneous movement of the muscles in the stomach, possibly requiring dietary modifications." },
      { id: "61", label: "None", value: "none", description: "No medical condition affecting dietary choices." }
    ];

  const handleSubmit = () => 
    {
        // Check if at least one key in the selectedAllergies object is true
        if (Object.values(selectedAllergies).some((id) => id)) 
            {
                saveAnswer(14, selectedAllergies);
                navigation.navigate('Question15'); 
            } 
        else 
            {
                Alert.alert("Selection Required", "Please select a body goal before proceeding.");
            }
    };

    const handleSelection = (value) => 
      {
        setSelectedAllergies((currentSelectedAllergies) => 
          {
            // Copy the current selected allergies
            const newSelectedAllergies = { ...currentSelectedAllergies };
    
          if (value === 'none') 
            {
              // If 'None' is selected, clear all other selections or unselect if already selected
              return newSelectedAllergies[value] ? {} : { [value]: true };
            } 
          else
            {
              // Toggle the selected allergy
              newSelectedAllergies[value] = !newSelectedAllergies[value];
    
              // Make sure 'none' is not selected when other options are selected
              delete newSelectedAllergies['none'];
            }
    
          return newSelectedAllergies;
        });
      };

      const filteredOptions = searchQuery.length > 0? allergyOptions.filter(option =>option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||option.description.toLowerCase().includes(searchQuery.toLowerCase())): allergyOptions

      return (
        <SafeAreaView style={styles.container}>
          
          {/* Progress Bar Container */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${(currentQuestion / totalQuestions) * 100}%` }]} />
            </View>
            </View>
      
          {/* Header for Back Arrow and Progress Text */}
          <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                    <Text style={styles.backArrowText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.progressNumber}>{`${currentQuestion}/${totalQuestions}`}</Text>
                </View>

       {/* Question Text */}
       <Text style={styles.questionText}>
     Do you suffer from any of these medical conditions?
    </Text>

    {/* Search Bar */}
    <TextInput
      style={styles.searchBar}
      placeholder="Search allergies..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />

       {/* Instructional Text */}
       <Text style={styles.instructionText}>
        Select any medical conditions you suffer from. This will help us tailor your diet to your needs. If you do not suffer from any of these conditions, then select 'None'
      </Text>

    {/* Options ScrollView */}
    <ScrollView style={styles.optionsScrollView} contentContainerStyle={styles.optionsContentContainer}>
      {filteredOptions.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedAllergies[option.value] ? styles.selectedOption : {}]}
          onPress={() => handleSelection(option.value)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/*Next Button */}
    <View style={styles.nextButtonContainer}>
      <TouchableOpacity
        style={[styles.nextButton, !Object.values(selectedAllergies).some(value => value) ? styles.disabledButton : {}]}
        onPress={handleSubmit}
        disabled={!Object.values(selectedAllergies).some(value => value)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>

  </SafeAreaView>
      );
    };

  const styles = StyleSheet.create({
    container: 
      {
        flex: 1,
        backgroundColor: '#FDF5EE',
      },
    header: 
      {
        alignItems: 'center',
       // justifyContent: 'center',
        flexDirection: 'row', 
      },
      backArrow: 
      {
        left: 18,
        color: '#522398',
      },
    backArrowText: 
      {
        fontSize: 20,
        fontWeight: 'bold',
  
      },
    backArrowContainer: 
      {
       // position: 'absolute',
        //left: 10, 
        //top: 30, 
      },
    progressNumber: 
      {
        position: 'absolute',
        right: 10, 
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
      },
    content: 
      {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
      },
    questionText: 
      {
        fontWeight: 'bold',
        fontSize: 25,
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'center',
      },
    option: 
      {
        backgroundColor: '#f0f0f0',
        width: 'auto',
        alignItems: 'center', 
        //width: '80%',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 30,
        //height: 70,
        //marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        margin: 5,
      },
    optionsContainer: 
      {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        flexGrow: 0,
        maxWidth: '90%', 
        maxHeight: 300, 
        marginHorizontal: 10, 
        alignSelf: 'stretch', 
      },
    optionText: 
      {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
      },
    optionsWrapper: 
      {
        flex: 1, 
        marginHorizontal: 20, 
      },
    selectedOption: 
      {
        backgroundColor: '#DFF0F1',
        borderColor: '#B2E4E6',
      },
    optionContent: 
      {
        flexDirection: 'row',
        alignItems: 'center',
      },
    image: 
      {
        width: 50,
        height: 50,
        marginRight: 10,
      },
    nextButton: 
      {
        backgroundColor: '#522398',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 30
      },
    nextButtonText: 
      {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
    nextButtonContainer: 
      {
        padding: 10, 
        backgroundColor: '#FDF5EE', 
      },
    disabledButton: 
      {
        backgroundColor: '#cccccc',
      },

    progressBar: 
      {
        height: '100%',
        backgroundColor: '#00bfa5',
      },
    progressBarContainer: 
      {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 30,
      },
    progressBarBackground: 
      {
        height: 20,
        flex: 1, 
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginHorizontal: 10, 
        overflow: 'hidden',
      },
    progressBarFill: 
      {
        height: '100%',
        backgroundColor: '#522398',
        borderRadius: 10,
      },
    checkmark: 
      {
        position: 'absolute',
        right: 20,
        top: '150%',
        transform: [{ translateY: -10 }],
        fontSize: 20,
        color: '#522398',
      },
    searchBar: 
      {
        height: 40,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        borderRadius: 20,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FDF5EE',
      },
      optionsContentContainer: 
      {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        padding: 10, 
      },
      instructionText: 
      {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 20, 
        marginBottom: 10, 
      },

  });
  

export default Question14;
