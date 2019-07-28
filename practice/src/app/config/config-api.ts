import { InjectionToken } from '@angular/core';
import { ApiConfig } from '../models/api';

export const staticPath = {
    apiUrl: "https://api.themoviedb.org/3",
    apiKey: '0994e7679a856150aadcecf7de489bce',
    imgPath: 'https://image.tmdb.org/t/p',
    localApiUrl: 'http://localhost:3000',
}

export const localConfig: ApiConfig = {
    apiKey: staticPath.apiKey,
    tokenUrl: `${staticPath.apiUrl}/authentication/token/new`,
    authenticationUrl: `${staticPath.apiUrl}/authentication/token/validate_with_login`,
    sessionUrl: `${staticPath.apiUrl}/authentication/session`,
    accountUrl: `${staticPath.apiUrl}/account`,
    movieUrl: `${staticPath.apiUrl}/movie`,
    searchUrl: `${staticPath.apiUrl}/search`,
    personUrl: `${staticPath.apiUrl}/person`,
    params: `?api_key=${staticPath.apiKey}&language=ru-RU`,     
    smallImgPath:`${staticPath.imgPath}/w185`,
    smallBackPath: `${staticPath.imgPath}/w300`,    
    midImgPath: `${staticPath.imgPath}/w500`,
    midBackPath: `${staticPath.imgPath}/w780`,
    bigBackPath: `${staticPath.imgPath}/w1280`,

    localApiUrl: staticPath.localApiUrl,
    favoriteApiUrl:`${staticPath.localApiUrl}/films/favorites`,
    bookmarkApiUrl: `${staticPath.localApiUrl}/films/bookmarks`,
}

export const LOCAL_CONFIG = new InjectionToken<ApiConfig>('');
