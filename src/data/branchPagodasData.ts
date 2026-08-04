export interface BranchPagoda {
  slug: string;
  name: string;
  image: string;
  address: string;
  phone: string;
}

export const BRANCH_PAGODAS: BranchPagoda[] = [
  {
    slug: "hon-mot",
    name: "Linh Quang Tịnh Xá Hòn Một",
    image: "/images/branches/image-01.png",
    address: "125 Lê Văn Sỹ, Phường 13, Quận 3, TP. Hồ Chí Minh",
    phone: "+84 28 3931 xxxx",
  },
  {
    slug: "suoi-nghe",
    name: "Linh Quang Tịnh Xá Suối Nghệ",
    image: "/images/branches/image-02.png",
    address: "48 Đường Số 5, Phường Linh Xuân, TP. Thủ Đức, TP. Hồ Chí Minh",
    phone: "+84 28 3897 xxxx",
  },
  {
    slug: "vung-tau",
    name: "Linh Quang Tịnh Xá Vũng Tàu",
    image: "/images/branches/image-03.png",
    address: "212 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh",
    phone: "+84 28 5412 xxxx",
  },
  {
    slug: "huynh-lam",
    name: "Tịnh Xá Huỳnh Lâm - Linh Quang",
    image: "/images/branches/image-04.png",
    address: "76 Huỳnh Tấn Phát, Phường Tân Thuận Đông, Quận 7, TP. Hồ Chí Minh",
    phone: "+84 28 3872 xxxx",
  },
  {
    slug: "linh-buu",
    name: "Tịnh Xá Linh Bửu",
    image: "/images/branches/image-05.png",
    // TODO: placeholder address/phone — replace with real info for this branch
    address: "TODO: Địa chỉ chưa cập nhật",
    phone: "TODO",
  },
];
