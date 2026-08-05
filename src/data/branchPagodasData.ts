export interface BranchPagoda {
  slug: string;
  name: string;
  image: string;
  abbotName: string;
  address: string;
  phone?: string;
}

export const BRANCH_PAGODAS: BranchPagoda[] = [
  {
    slug: "hon-mot",
    name: "Linh Quang Tịnh Xá Hòn Một",
    image: "/images/branches/image-01.png",
    abbotName: "Thượng Toạ Thích Minh Luận",
    address:
      "Trên đỉnh đồi Hòn Một, thị trấn Phước Hải, huyện Đất Đỏ, tỉnh Bà Rịa - Vũng Tàu",
    phone: "0974.491.000",
  },
  {
    slug: "suoi-nghe",
    name: "Linh Quang Tịnh Xá Suối Nghệ",
    image: "/images/branches/image-02.png",
    abbotName: "Đại Đức Thích Minh Chuẩn",
    address: "Xã Suối Nghệ, huyện Châu Đức, tỉnh Bà Rịa - Vũng Tàu",
  },
  {
    slug: "vung-tau",
    name: "Linh Quang Tịnh Xá Vũng Tàu",
    image: "/images/branches/image-03.png",
    abbotName: "Ni Sư Thích Nữ Phước Thiền",
    address:
      "336 Trương Công Định, Phường 8, Thành phố Vũng Tàu, tỉnh Bà Rịa - Vũng Tàu",
    phone: "0909.867.793",
  },
  {
    slug: "huynh-lam",
    name: "Huỳnh Lâm Tịnh Xá",
    image: "/images/branches/image-04.png",
    abbotName: "Thượng Toạ Thích Minh Phẩm",
    address: "Thị trấn Long Hải, huyện Đất Đỏ, tỉnh Bà Rịa - Vũng Tàu",
    phone: "0917.808.929",
  },
  {
    slug: "linh-buu",
    name: "Tịnh Xá Linh Bửu - Mỏ Cày Bến Tre",
    image: "/images/branches/image-05.png",
    abbotName: "Đại Đức Thích Giới Ân",
    address: "Ấp Tân Hậu 2, xã Tân Trung, huyện Mỏ Cày Nam, tỉnh Bến Tre",
    phone: "0947.471.839",
  },
];
