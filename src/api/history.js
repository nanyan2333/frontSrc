import request from "@/utils/request.js"

export function addRecord(_id,_record,_time) {
  const data = {
    pid: _id,
    record: _record,
    time: _time,
  }
  return request.post('/addRecord', data)
}

export function searchRecord(_id) {
  const data = {
    id: _id
  }
  return request.post('/searchRecord', data)
}

export function updateRecord(_id, _time, _updateInfo) {
  const data = {
    id: _id,
    time: _time,
    updateInfo: _updateInfo
  }
  return request.post('/updateRecord', data)
}
