import React from 'react'
import useSpeakerDataManager from './useSpeakerDataManager';

export const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const {
        speakerList,
        isLoading,
        toggleSpeakerFavorite,
        favoriteClickCount,
        incrementFavoriteClickCount,
        hasError,
        error,
        imageRerenderIdentifier,
        forceImageRerender
    } = useSpeakerDataManager()

    const provider =  {
        speakerList, isLoading, toggleSpeakerFavorite, favoriteClickCount, incrementFavoriteClickCount,
        hasError,
        error,
        imageRerenderIdentifier,
        forceImageRerender
    }

    return (
        <GlobalContext.Provider value={provider}>
            {children}
        </GlobalContext.Provider>
    )
}