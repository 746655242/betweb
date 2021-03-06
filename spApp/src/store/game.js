/**
 * 按照串关场数分组，3场串、4场串。。。8场串。
 * 每组串关场次包含多个串关方式，如3串3、3串4，多个串关方式对应不同的再分组区间。
 * [串N, Max, Min]表示比赛场次按N场分组后，每组再进行串Max分组，然后对每组进行组合；以上操作循环至Min
 */
const PASS_MODE_MAP = [
  [
    [3, 2, 2], // 3x3
    [4, 3, 2] // 3x4
  ],
  [
    [4, 3, 3], // 4x4
    [5, 4, 3], // 4x5
    [6, 2, 2], // 4x6
    [11, 4, 2] // 4x11
  ],
  [
    [5, 4, 4], // 5x5
    [6, 5, 4], // 5x6
    [10, 2, 2], // 5x10
    [16, 5, 3], // 5x16
    [20, 3, 2], // 5x20
    [26, 5, 2] // 5x26
  ],
  [
    [6, 5, 5], // 6x6
    [7, 6, 5], // 6x7
    [15, 2, 2], // 6x15
    [20, 3, 3], // 6x20
    [22, 6, 4], // 6x22
    [35, 3, 2], // 6x35
    [42, 6, 3], // 6x42
    [50, 4, 2], // 6x50
    [57, 6, 2] // 6x57
  ],
  [
    [7, 6, 6], // 7x7
    [8, 7, 6], // 7x8
    [21, 5, 5], // 7x21
    [35, 4, 4], // 7x35
    [120, 7, 2] // 7x120
  ],
  [
    [8, 7, 7], // 8x8
    [9, 8, 7], // 8x9
    [28, 6, 6], // 8x28
    [56, 5, 5], // 8x56
    [70, 4, 4], // 8x70
    [247, 8, 2] // 8x247
  ]
]

const PASS_MODE_MAP2 = [
  [3, 3],
  [3, 4],
  [4, 4],
  [4, 5],
  [4, 6],
  [4, 11],
  [5, 5],
  [5, 6],
  [5, 10],
  [5, 16],
  [5, 20],
  [5, 26],
  [6, 6],
  [6, 7],
  [6, 15],
  [6, 20],
  [6, 22],
  [6, 35],
  [6, 42],
  [6, 50],
  [6, 57],
  [7, 7],
  [7, 8],
  [7, 21],
  [7, 35],
  [7, 120],
  [8, 8],
  [8, 9],
  [8, 28],
  [8, 56],
  [8, 70],
  [8, 247]
]

// 北京单场过关列表
const PASS_MODE_TYPE_BD = [
  [
    [3, 2, 1] // 2x3
  ],
  [
    [4, 3, 2], // 3x4
    [7, 3, 1] // 3x7
  ],
  [
    [5, 4, 3], // 4x5
    [11, 4, 2], // 4x11
    [15, 4, 1] // 4x15
  ],
  [
    [6, 5, 4], // 5x6
    [16, 5, 3], // 5x16
    [26, 5, 2], // 5x26
    [31, 5, 1] // 5x31
  ],
  [
    [7, 6, 5], // 6x7
    [22, 6, 4], // 6x22
    [42, 6, 3], // 6x42
    [57, 6, 2], // 6x57
    [63, 6, 1] // 6x63
  ]
]

const PASS_MODE_TYPE2_BD = [
  [2, 3],
  [3, 4],
  [3, 7],
  [4, 5],
  [4, 11],
  [4, 15],
  [5, 6],
  [5, 16],
  [5, 26],
  [5, 31],
  [6, 7],
  [6, 22],
  [6, 42],
  [6, 57],
  [6, 63]
]
/**
 *
 * @param {Array} matches 订单场次
 * @param {Number} cgCount 串关场数
 * @param {Number} cgMode 串关方式
 */
function createMode (matches, cgCount, cgMode) {
  // export default function createMode (matches, cgCount, cgMode){
  let cgroup = PASS_MODE_MAP[cgCount - 3]

  let range = []

  for (let i = 0, len = cgroup.length; i < len; i++) {
    if (cgroup[i][0] === cgMode) {
      range = cgroup[i].slice(1)
      break
    }
  }

  let ret = CS(matches, cgCount) // 按照串关场数进行组合

  let total = [] // 串关结果
  let [max, min] = range

  // 遍历组合，生成串关方式
  for (let j = 0, jen = ret.length; j < jen; j++) {
    // 遍历串关方式对应的分组区间
    for (let k = min; k <= max; k++) {
      let partial = CS(ret[j], k)

      // 遍历最终的分组，进行每组元素中每场比赛选项的混合，如有三场比赛，则从每场比赛中选一个选项
      for (let p = 0, pen = partial.length; p < pen; p++) {
        let grp = mix(partial[p], partial[p].length)
        total = total.concat(grp)
      }
    }
  }
  return total
}

// 计算total场比赛的排列组合
function CS (total, num, i = 0, concat) {
  let ret = []
  for (let len = total.length; i < len; i++) {
    let rest = concat ? [].concat(concat, [total[i]]) : [total[i]]
    if (num > 1) {
      ret = ret.concat(CS(total, num - 1, i + 1, rest))
    } else {
      ret.push(rest)
    }
  }
  return ret
}

function createMode2 (matches, cgCount, cgMode) {
  // export default function createMode (matches, cgCount, cgMode){
  let cgroup = PASS_MODE_MAP[cgCount - 3]
  let range = []

  for (let i = 0, len = cgroup.length; i < len; i++) {
    if (cgroup[i][0] === cgMode) {
      range = cgroup[i].slice(1)
      break
    }
  }

  let ret = CS(matches, cgCount) // 按照串关场数进行组合

  let total = [] // 串关结果
  let [max, min] = range

  // 遍历组合，生成串关方式
  for (let j = 0, jen = ret.length; j < jen; j++) {
    // 遍历串关方式对应的分组区间
    for (let k = min; k <= max; k++) {
      let kg = CS2(ret[j])
      for (let jj = 0, ken = kg.length; jj < ken; jj++) {
        let partial = CS(kg[jj], k)
        total = total.concat(partial)
      }
    }
  }
  return total
}

// 计算total场比赛不去重
function CS2 (total) {
  let sarr = [[]]

  for (let len = total.length, i = 0; i < len; i++) {
    let tarr = [] // 暂时存
    for (var j = 0; j < sarr.length; j++) {
      for (let k = 0; k < total[i].length; k++) {
        tarr.push(sarr[j].concat(total[i][k]))
      }
    }
    sarr = tarr
  }
  return sarr
}

// 遍历每组比赛，取每场比赛的一个选项进行组合
function mix (list, limit, idx = 0, concat) {
  let ret = []

  for (let i = 0, len = list[idx].length; i < len; i++) {
    let rest = concat ? concat.concat(list[idx][i]) : [list[idx][i]]
    if (limit > 1) {
      ret = ret.concat(mix(list, limit - 1, idx + 1, rest))
    } else {
      ret.push(rest)
    }
  }

  return ret
}

function createOne (matches, cgCount) {
  let range = [cgCount, cgCount]
  let ret = CS(matches, cgCount) // 按照串关场数进行组合

  let total = [] // 串关结果
  let [max, min] = range

  // 遍历组合，生成串关方式
  for (let j = 0, jen = ret.length; j < jen; j++) {
    // 遍历串关方式对应的分组区间
    for (let k = min; k <= max; k++) {
      let partial = CS(ret[j], k)
      // 遍历最终的分组，进行每组元素中每场比赛选项的混合，如有三场比赛，则从每场比赛中选一个选项
      for (let p = 0, pen = partial.length; p < pen; p++) {
        let grp = mix(partial[p], partial[p].length)
        total = total.concat(grp)
      }
    }
  }
  return total
}

function createList (matches, cgCount, cgMode) {
  if (cgMode == 1) {
    return createOne(matches, cgCount)
  } else {
    return createMode2(matches, cgCount, cgMode)
  }
}

export {
  // 多串
  createMode,
  createOne,
  createList,
  PASS_MODE_MAP,
  PASS_MODE_MAP2,
  PASS_MODE_TYPE_BD,
  PASS_MODE_TYPE2_BD
}
