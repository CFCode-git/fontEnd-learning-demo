# 排序系列 (假设长度为n的数组)

## bubbleSort 冒泡排序 O(n^2)

第一轮比较 n-1 次, 第二轮 n-2 次, ... 第 n-1 轮比较 n 次, 总的比较次数为 (n-1)+(n-2)+....+1 约等于 (n^2)/2 次, 时间复杂度为 O(n^2)

## selectSort 选择排序 O(n^2)

第一轮比较 n-1 次得到最小的值放在最左侧, 第二轮比较 n-2 次得到最小的值, .... , 到第 n-1 轮比较 1 次得到最小的值, 所以总共需要比 (n-1)+(n-2)+....+1 约等于 (n^2)/2 次, 时间复杂度为 O(n^2)

## insertSort 插入排序 O(n^2)

一开始第一轮就假设数组的第一项a[0]已经排好, 从第二轮开始与前面排好序的项进行比较. 第二轮比较是a[1]和前面的a[0]比较一次, 第三轮是a[2]和前面的a[0], a[1]比较两次, 第k轮比较 k-1 次, 到第n项最多比较n-1次. 所以总共需要比 1+2+...+(n-1) 次, 时间复杂度为O(n^2)

## mergeSort 归并排序 O(nlogn)

把序列分成两个子序列, 然后对这两个子序列的首位进行比较, 取出符合条件的数据进行合并. 长度为n的数组可以分成 log2n 行, 每一行都要进行n次比较, 运行时间都为 O(n). 所以总的运行时间为 O(nlogn)

## quickSort 快速排序 O(nlogn)

分治法

从随机数列中随机选取一个基准值, 将除了基准值以外的数按照"比基准值大"和"比基准值小"这两个类别放到左边和右边, 然后合并[左边,基准值, 右边], 递归这个过程即可得到排序后的数列.

如果每一次选到的基准值恰好都能使得左右两个序列的长度为原来的一半, 那么快排和归并排序的时间复杂度一致, 都是 O(nLogn), 

如果每次一都选中最小/大值作为基准值, 那么相当于每次都要把所有的数据移到左边/右边, 递归执行n次, 那么就和选择排序一样了, 时间复杂度为 O(n^2), 

假设每个数字选为基准值的概率相等, 那么平均来看时间复杂度为 O(nlogn)

# countSort 计数排序 O(n+k) k为整数的范围

计数排序是一种非基于比较的排序算法,在对一定范围内的整数进行排序时, 它的时间复杂度为 O(n+k), 快于任何比较排序算法