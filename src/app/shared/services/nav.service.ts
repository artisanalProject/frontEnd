import { HttpClient } from '@angular/common/http';
import { Injectable, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService implements OnInit{
	categorie: any
	baseUrl="/api";
	constructor(private http: HttpClient) { }
	ngOnInit(): void {
		this.getCategories().subscribe(res=>{this.categorie=res})
	}
	public getCategories(): Observable<Category[]> {
	  return this.http.get<Category[]>(this.baseUrl+"/category/getCategories")
	}

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '', title: 'home', type: 'link', active: false
		},
		{
			 path: '/shop/collection/left/sidebar',title: 'Shop', type: 'link', active: false
		},
		{ path: '/pages/contact', title: 'contact', type: 'link' , active: false},
		{ path: '/pages/aboutus', title: 'about-us', type: 'link',active: false },
		{ path: '/pages/blog', title: 'blog', type: 'link',active: false },
		
	];

	LEFTMENUITEMS: Menu[] =
	
	[
		{
			title: 'Coutue', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'Sous-categorie',  type: 'link', active: false, children: [
					  { path: 'shop/collection/left/sidebar', title: 'tapis',  type: 'link' },
					  { path: '/home/fashion', title: 'top',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'shirts',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' }
				  ]
			  },
			//   {
			// 	  title: 'women fashion',  type: 'link', active: false, children: [
			// 		  { path: '/home/fashion', title: 'dresses',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'skirts',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'westarn wear',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'bottom',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
			// 		  { path: '/home/fashion', title: 'bottom wear',  type: 'link' }
			// 	  ]
			//   },
			]
		},
	
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
