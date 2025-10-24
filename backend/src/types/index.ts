export interface User {
id: number;
email: string;
password?: string;
}


export interface Product {
id?: number;
owner_id?: number;
title: string;
image?: string;
description?: string;
pricePromo?: number | null;
price: number;
}