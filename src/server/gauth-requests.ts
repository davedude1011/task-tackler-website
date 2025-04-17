"use server"

export type upload_response_t = { image_uri: string, image_width: string, image_height: string }

export async function gauth_tapper_upload_image(image: Base64URLString, url_parameters: Record<string, string>): Promise<upload_response_t | null> {
  let request_url = `https://api-sea.gauthmath.com/ehi/web_api/material/upload?${new URLSearchParams(url_parameters)}`

  const form_data = new FormData();
  let image_file: File | null = null;

  const fetch_response = await fetch(image)
  const image_blob = await fetch_response.blob()
  image_file = new File([image_blob], "image.jpg", {
    type: image_blob.type,
  })
  
  if (image_file) {
    form_data.append("file", image_file);

    const response = await fetch(request_url, {
      method: "POST",
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "agw-js-conv": "str",
      },
      referrer: "https://www.gauthmath.com/",
      body: form_data,
    });
    
    try {
      const data = JSON.parse(await response.text())
  
      return {
        image_uri: data.ImageInfo.ImageUri,
        image_width: data.ImageInfo.ImageWidth,
        image_height: data.ImageInfo.ImageHeight,
      }
    }
    catch{}
  }
  console.log("Upload Image Error!")
  return null
}

export async function gauth_tapper_create_question(image_data: upload_response_t, url_parameters: Record<string, string>): Promise<string | null> {
  let request_url = `https://api-sea.gauthmath.com/ehi/question/create_v2?${new URLSearchParams(url_parameters)}`

  const response = await fetch(request_url, {
    method: "POST",
    headers: {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "agw-js-conv": "str",
    },
    referrer: "https://www.gauthmath.com/",
    body: JSON.stringify({
      image: {
        uri: image_data.image_uri,
        width: image_data.image_width,
        height: image_data.image_height,
      },
      region: "tw",
    }),
  });

  try {
    const data = JSON.parse(await response.text())
  
    if (data.questionID) {
      return data.questionID as string
    }
  }
  catch{}

  console.log("Ceate Question Error!")
  return null
}

export async function gauth_tapper_get_solution(question_id: string, url_parameters: Record<string, string>, cookie_parameters: Record<string, string>) {
  const request_url = `https://api-sea.gauthmath.com/ehi/web_api/solution_detail/get?${new URLSearchParams(url_parameters)}`

  const cookie_value = Object.keys(cookie_parameters).map((cookie_key) => `${cookie_key}=${cookie_parameters[cookie_key]};`).join(" ")

  const response = await fetch(request_url, {
    method: "POST",
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en;q=1,zh-CN,zh;q=0.9,fr;q=0.8',
      'agw-js-conv': 'str',
      'content-type': 'application/json;charset=UTF-8',
      'origin': 'https://www.gauthmath.com',
      'priority': 'u=1, i',
      'referer': 'https://www.gauthmath.com/',
      'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      'x-request-source': 'csr',
      'x-web-domain': 'www.gauthmath.com',
      'cookie': cookie_value,
    },
    referrer: "https://www.gauthmath.com/",
    body: JSON.stringify({
      SolutionUrl: question_id,
      WebSolutionScene: 4,
      RequestId: String(Date.now()),
    }),
  });

  try {
    const data = JSON.parse(await response.text());
    if (data.WebSolution) {
      return data.WebSolution
    }
  }
  catch{}
  
  console.log("Get Solution Error!")
  return null;
}
