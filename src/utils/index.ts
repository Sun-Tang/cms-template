import moment from 'moment'

const compare = (property: string) => {
  return (a: any, b: any) => {
    const value1 = a[property]
    const value2 = b[property]
    return value1 - value2
  }
}

export const menuFilter = (arr: any[]) => {
  const arr1: any[] = []
  const arr2: any[] = []
  const arr3: any[] = []
  arr.forEach(item => {
    if (item.resourcesType === 0) {
      arr1.push(item)
    } else if (item.resourcesType === 1) {
      arr2.push(item)
    } else {
      arr3.push(item)
    }
  })
  for (let a = 0; a < arr2.length; a++) {
    arr2[a].children = []
    for (let b = 0; b < arr3.length; b++) {
      if (arr2[a].id === arr3[b].parentId) {
        arr2[a].children.push(arr3[b])
      }
    }
  }

  for (let i = 0; i < arr1.length; i++) {
    arr1[i].children = []
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i].id === arr2[j].parentId) {
        arr1[i].children.push(arr2[j])
      }
    }
  }

  arr1.forEach(item => {
    if (item.children && item.children.length > 0) {
      item.children.sort(compare('sort'))
    }
  })

  return arr1.sort(compare('sort'))
}

export const dateFilter = (arr: Array<any>) => {
  arr.forEach((item: any) => {
    if (item.createdAt) {
      item.createdAt = moment(item.createdAt).format('YYYY/MM/DD HH:mm:ss')
    }
    if (item.updatedAt) {
      item.updatedAt = moment(item.updatedAt).format('YYYY/MM/DD HH:mm:ss')
    }

    if (item.publicTime) {
      item.publicTime = moment(item.publicTime).format('YYYY-MM-DD HH:mm:ss')
    }

    if (item.expireTime) {
      item.expireTime = moment(item.expireTime).format('YYYY/MM/DD HH:mm:ss')
    }

    if (item.children && item.children.length > 0) {
      dateFilter(item.children)
    }
  })
}
