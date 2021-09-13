import { Injectable, HostListener, Inject } from "@angular/core";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      path: "/dashboard/default",
      title: "Dashboard",
      icon: "home",
      type: "link",
      badgeType: "primary",
      active: false,
    },

    {
      title: "Produits",
      icon: "box",
      type: "sub",
      active: false,
      children: [
        { path: "/products/category", title: "Category", type: "link" },
        { path: "/products/product-list", title: "Mes Produits", type: "link" },
      ],
    },

    {
      title: "Sales",
      icon: "dollar-sign",
      type: "sub",
      active: false,
      children: [
        { path: "/sales/orders", title: "Orders", type: "link" },
        { path: "/sales/transactions", title: "Transactions", type: "link" },
      ],
    },
    {
      path: "/vendors/list-vendors",
      icon: "users",
      title: "Artisant",
      type: "link",
    },
    {
      path: "/blog/listAticle",
      title: "blog",
      type: "link",
      icon: "tag",
    },
  ];

  MENUITEMSARTISAN: Menu[] = [
    {
      title: "Mes produits",
      icon: "box",
      type: "sub",
      active: false,
      children: [
        {
          path: "/products/add-request-product",
          title: "Ajouter nouveau produit",
          type: "link",
        },
        {
          path: "/products/pending-products",
          title: "Produits en attente",
          type: "link",
        },
        {
          path: "/products/refused-requests-product",
          title: "Produits réfusés",
          type: "link",
        },
        {
          path: "/products/confirmed-products",
          title: "Produits dans le shop",
          type: "link",
        },
      ],
    },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS); // admin
  itemsArtisan = new BehaviorSubject<Menu[]>(this.MENUITEMSARTISAN); // artisan
}
