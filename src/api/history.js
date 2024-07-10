import request from "@/utils/request.js"

export function addRecord(data) {
    return request.post('/addRecord', data)
}

export function searchRecord(data) {
  return request.post('/searchRecord', data)
}

export function updateRecord(_id,_time,_updateInfo) {
  const data = {
    id: _id,
    time: _time,
    updateInfo:_updateInfo
  }
  return request.post('/updateRecord', data)
}
