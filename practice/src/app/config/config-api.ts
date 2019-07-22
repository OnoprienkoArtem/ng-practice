import { InjectionToken } from '@angular/core';
import { ApiConfig } from '../models/api';

export const staticPath = {
    apiUrl: "https://api.themoviedb.org/3",
    apiKey: 'f7ce96b08789255f247db434150c7493',
    imgPath: 'https://image.tmdb.org/t/p',
    localApiUrl: 'http://localhost:3000',
}

export const localConfig: ApiConfig = {
    localApiUrl: staticPath.localApiUrl,
    movieUrl: `${staticPath.apiUrl}/movie`,
    searchUrl: `${staticPath.apiUrl}/search`,
    personUrl: `${staticPath.apiUrl}/person`,
    params: `?api_key=${staticPath.apiKey}&language=ru-RU`,     
    smallImgPath:`${staticPath.imgPath}/w185`,
    smallBackPath: `${staticPath.imgPath}/w300`,    
    midImgPath: `${staticPath.imgPath}/w500`,
    midBackPath: `${staticPath.imgPath}/w780`,
    bigBackPath: `${staticPath.imgPath}/w1280`,
    favoriteApiUrl:`${staticPath.localApiUrl}/films/favorites`,
    bookmarkApiUrl: `${staticPath.localApiUrl}/films/bookmarks`,
}

export const LOCAL_CONFIG = new InjectionToken<ApiConfig>('');
