import firebase from '../../config/fbConfig'

export const getQuizes = async (dispatch)=>{
    const quizArray = [];
    const quizArraySnapshot = await firebase.firestore().collection('Quizes').get()

    quizArraySnapshot.docs.map(doc=>{
        quizArray.push({
            id: doc.id,
            ...(doc.data())
        })
    })
    console.log(quizArray)
    dispatch({type:'FETCH_QUIZES', quizes: quizArray})
}