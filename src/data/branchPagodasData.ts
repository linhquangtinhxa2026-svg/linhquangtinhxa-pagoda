export interface BranchPagoda {
  slug: string;
  name: string;
  image: string;
  address: string;
  phone: string;
}

export const BRANCH_PAGODAS: BranchPagoda[] = [
  {
    slug: "linh-son",
    name: "Tịnh Xá Linh Sơn",
    image: "/images/lien-he/branch-pagoda-1.jpg",
    address: "125 Lê Văn Sỹ, Phường 13, Quận 3, TP. Hồ Chí Minh",
    phone: "+84 28 3931 xxxx",
  },
  {
    slug: "linh-buu",
    name: "Tịnh Xá Linh Bửu",
    image: "/images/lien-he/branch-pagoda-2.jpg",
    address: "48 Đường Số 5, Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh",
    phone: "+84 28 3897 xxxx",
  },
  {
    slug: "linh-an",
    name: "Tịnh Xá Linh An",
    image: "/images/lien-he/branch-pagoda-3.jpg",
    address: "212 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh",
    phone: "+84 28 5412 xxxx",
  },
  {
    slug: "linh-hoa",
    name: "Tịnh Xá Linh Hòa",
    image: "/images/lien-he/branch-pagoda-4.jpg",
    address: "76 Huỳnh Tấn Phát, Phường Tân Thuận Đông, Quận 7, TP. Hồ Chí Minh",
    phone: "+84 28 3872 xxxx",
  },
];
