import request from "@/utils/request";
import md5 from "md5";

export async function getFakeCaptcha(params) {
  return request(
    `/api/account/sendCode?mobile=${params.mobile}&id=${params.id}&code=${params.code}`
  );
}

export async function getImgCode(id) {
  return request(`/api/account/getImg?id=${id}`);
}

export async function register(params) {
  return request("/api/account/reg", {
    method: "POST",
    requestType: "form",
    data: params
  });
}
