import speakersReducer from './speakerReducer';
import {useEffect, useReducer, useContext} from 'react';
import axios from 'axios';
import {InitialSpeakerDataContext} from '../pages/speakers'

function useSpeakerDataManager() {
    const initialSpeakersData = useContext(InitialSpeakerDataContext)

    const [
        {
            speakerList,
            isLoading,
            favoriteClickCount,
            hasError,
            error,
            imageRerenderIdentifier
        }, dispatch] = useReducer(speakersReducer, {
        isLoading: true,
        speakerList: [],
        favoriteClickCount: 10,
        hasError: false,
        error: null,
        imageRerenderIdentifier: 0
    })

    function forceImageRerender() {
        dispatch({
            type: 'forceImageRerender'
        })
    }

    function incrementFavoriteClickCount() {
        dispatch({
            type: 'incrementFavoriteClickCount'
        })
    }

    function toggleSpeakerFavorite(speakerRec) {
        const updateData = async function () {
            axios.put(`api/speakers/${speakerRec.id}`, { ...speakerRec, favorite:
                    !speakerRec.favorite })
            const hasFavorite = speakerRec.favorite ? 'unfavorite' : 'favorite'
            dispatch({
                type: hasFavorite,
                id: speakerRec.id
            })
        }
        updateData()
    }

    useEffect(() => {
        // new Promise(function (resolve) {
        //     setTimeout(function () {
        //         resolve();
        //     }, 1000);
        // }).then(() => {
        //     dispatch({
        //         type: 'setSpeakerList',
        //         data: speakerData
        //     })
        // });

        const fetchData = async () => {
            try {
                let result = await axios.get('api/speakers')
                dispatch({
                    type: 'setSpeakerList',
                    data: result.data
                })
            } catch (e) {
                dispatch({
                    type: 'errored',
                    error: e
                })
            }
        }

        fetchData()

        return () => {
            console.log('cleanup');
        };
    }, [])

    return {
        speakerList,
        isLoading,
        toggleSpeakerFavorite,
        favoriteClickCount,
        incrementFavoriteClickCount,
        error,
        hasError,
        imageRerenderIdentifier,
        forceImageRerender
    }
}

export default useSpeakerDataManager