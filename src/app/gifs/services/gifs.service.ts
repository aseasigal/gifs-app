import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
    constructor(private http : HttpClient) {
        this.loadLocalStorage()
    }
    public gifList : Gif[] = []
    private apiKey     : string = '1u0dl5cVMpI2LUj3zi7PQrYiSkajLAPv'
    private serviceUrl : string = 'https://api.giphy.com/v1/gifs'
    private _tagsHistory :string[] = []

    get tagHistory(){
        return [...this._tagsHistory]
    }
    private saveLocalStorage():void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }
    private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
    this.searchTag(this._tagsHistory[0])
    }

    private organizeTagHistory(tag:string){
        tag = tag.toLowerCase()
        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }
        this._tagsHistory.unshift(tag)
        this._tagsHistory = this._tagsHistory.splice(0,10)
        this.saveLocalStorage()

    }
    async searchTag(tag : string):Promise<void>{
        if (tag.length === 0) return
        this.organizeTagHistory(tag)
        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', tag)
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
        .subscribe((resp)=>{
            this.gifList = resp.data
        })
        // fetch('https://api.giphy.com/v1/gifs/search?api_key=1u0dl5cVMpI2LUj3zi7PQrYiSkajLAPv&q=valorant&limit=10')
        // .then(resp => resp.json())
        // .then(data => console.log(data))
    }
}
    