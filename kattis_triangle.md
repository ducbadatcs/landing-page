# Bài toán: Độ dài Sierpiński

### Link đề bài: https://open.kattis.com/problems/triangle

## Đề bài-

Để tóm gọn đề bài:  

> Tam giác Sierpiński là 1 hình được cấu tạo như sau:  
> 
> 1. Đầu tiên, bắt đầu bằng 1 tam giác  
> 
> 2. Thu nhỏ hình tam giác đó thành 1 tam giác có cạnh đáy và đường cao = 1/2 cạnh đáy và đường cao của tam >giác gốc, sau đó tạo 2 bản sao của tam giác nhỏ đó  
> 
> 3. Ghép 3 tam giác sao cho chúng chạm nhau ở 3 góc. Hình hiện tại sẽ là hình ghép này  
> 
> 4. Lặp lại bước 2    

Với số lặp của bước 4 càng lớn đến vô cùng, sẽ tạo ra một hình gồm vô cùng nhiều các tam giác đen nhỏ, nhưng chúng ta chỉ xét trường hợp bước 4 lặp lại 1 số lần hữu hạn. Giả sử chúng ta có 1 tam giác lớn có chu vi bằng 3, sau khi lặp lại bước 4 $N$ lần, tổng chu vi các tam giác đen nhỏ là bao nhiêu? Lưu ý là số này có thể rất lớn và lẻ, nên hãy in ra **số chữ số của phần nguyên** số đó.  

### Input: Nhiều dòng, mỗi dòng có 1 số $N$, $0 \leq N \leq 10000$

### Output: Số chữ số của phần nguyên của tổng chu vi các tam giác nhỏ nếu lặp lại bước 4 $N$ lần. (Đây là tóm gọn, trên thực tế output gốc của đề bài cần in ra số testcase theo kiểu ```Case 1:, Case 2:, ...``` nên mình bỏ qua.)

## Bài giải

Đầu tiên, chúng ta sẽ giả sử tam giác lớn ban đầu là 1 tam giác đều, vì đây sẽ là trường hợp đặc biệt dễ tính nhất (và không sợ mất tính tổng quát, tại vì đề bài không cho điều kiện gì thêm ngoài chu vi tam giác bằng $3$. Các cạnh của tam giác này khi đó sẽ bằng $1$, và mỗi bước chúng ta sẽ chia được các tam giác nhỏ hơn đều là tam giác đều. Như vậy, chúng ta cần đếm số tam giác đen nhỏ, và độ dài mỗi cạnh của các tam giác đen nhỏ đó. Để thuận tiện, chúng ta gọi hàm tổng chu vi các tam giác con là $C(n)$, hàm này sẽ có giá trị là $3 * s_n * l_n$ với $s_n$ là số tam giác con ở bước thứ $n$, VÀ $l_n$ là độ dài cạnh 1 tam giác con ở bước thứ $n$.

Để đếm số tam giác đen nhỏ, chúng ta nhận thấy mỗi khi chia 1 tam giác lớn thì chúng ta luôn được 3 tam giác nhỏ, nên có số tam giác bước $(N + 1)$ = $3$ * số tam giác bước $N$ (vì từ bước $N$ sang bước $N + 1$ luôn có 3 tam giác con sinh ra từ 1 tam giác), nên số tam giác có dạng cấp số nhân $s_n = a * 3^n$, với $a$ là số tam giác ở bước ban đầu, bước 0, mà vì bước 0 chỉ có 1 tam giác lớn nên $a = 1$. Từ đó, ta có số tam giác con ở bước $N$ là $3^n$.

Tiếp theo, ta cần tính độ dài mỗi cạnh các tam giác nhỏ. Dễ thấy ở mỗi bước, các tam giác nhỏ sinh ra đều có cạnh bằng nửa tam giác ban đầu, nên độ dài cạnh của 1 tam giác con ở bước $N$ là $l_n = a * \frac{1}{2^n}$. Vì tam giác ban đầu có cạnh bằng 1, nên $a = 1$. Ta kết luận độ dài 1 cạnh tam giác con là $l_n = \frac{1}{2 ^ n}$

vậy có $3^n$ tam giác con, hay có $3 ^ n * 3 = 3^{n+1}$ cạnh (mỗi tam giác con có 3 cạnh), và mỗi cạnh này có độ dài $\frac{1}{2^n}$, nên chu vi của nó là $C(n) = 3^{n + 1} * \frac{1}{2 ^ n} = \frac{3^{n+1}}{2^n}$. Vậy là chúng ta đã có công thức để tính $C(n)$, nhưng đề bài lại yêu cầu ta tính **số chữ số của phần nguyên** của nó. Vậy ta phải làm như thế nào?

### Cách giải 1: Tính trực tiếp

Cách đơn giản nhất là tính trực tiếp $C(n)$, rồi in ra số chữ số của nó. Số chữ số của phần nguyên 1 số thập phân $x$ bất kỳ là $\lfloor log_{10}(x) \rfloor + 1$ 

```python
def C(n: int) -> float:
    return 3 ** (n + 1) / 2 ** n

def sochusocuaC(n: int) -> int:
    return floor(log10(C(n))) + 1
```

```cpp
long double C(int n){
    return (long double)(pow(3, n + 1)) / pow(2, n);
}

int sochusocuaC(int n){
    return floor(log10l(C(n))) + 1;
}
```

ĐPT: $O(N)$

Để tính các phép mũ nhanh hơn, ta có thể sử dụng [Lũy thừa nhanh](https://hackmd.io/@DeMen100ms/DeMenBlog3). Cần lưu ý là ta phải bỏ modulo đi do cần xử lý kết quả lớn.

```python
def pow(a: int, b: int) -> int:
    t = 1
    while (b > 0):
        if (b % 2 == 1):
            t *= a
        a = a * a
        b //= 2

def C(n: int) -> float:
    return pow(3, n + 1) / pow(2, n)

def sochusocuaC(n: int) -> int:
    return floor(log10(C(n))) + 1
```

```cpp
long long pow(long long a, long long b){
    long long t = 1;
    while (b > 0){
        if (b % 2 == 1) t *= a;
        a = a * a;
        b /= 2;
    }
}

long double C(int n){
    return (long double)(pow(3, n + 1)) / pow(2, n);
}

int sochusocuaC(int n){
    return floor(log10l(C(n))) + 1;
}
```

ĐPT: $O(log \ {n})$

Chú ý rằng $\frac{3 ^ {n + 1}}{2 ^ n} = 3 * \frac{3^n}{2^n} = 3 * (\frac{3}{2})^n$, nên ta có thể thay đổi hàm `pow` để giảm số phép nhân và lần gọi hàm này.

```python
def pow(a: float, b: int) -> float:
    #lưu ý a lúc này là kiểu dữ liệu float
    t = 1
    while (b > 0):
        if (b % 2 == 1):
            t *= a
        a = a * a
        b //= 2

def C(n: int) -> float:
    return pow(3/2, n) * 3

def sochusocuaC(n: int) -> int:
    return floor(log10(C(n))) + 1
```

```cpp
long double pow(long double a, int b){
    long double t = 1;
    while (b > 0){
        if (b % 2 == 1) t *= a;
        a = a * a;
        b /= 2;
    }
}

long double C(int n){
    return (long double)pow(3/2, n) * 3;
}


int sochusocuaC(int n){
    return floor(log10l(C(n))) + 1;
}
```

ĐPT: $O(log \ n)$

Tuy nhiên, cách này cần tính kết quả lớn, rất dễ bị tràn số với các ngôn ngữ như C, C++, ... Vì vậy, ta cần cách khác.

### Cách giải 2: Cách giải gián tiếp

Tuy chúng ta không thể tính được $C(n)$ một cách trực tiếp, nhưng chúng ta vẫn có thể tính được  $log_{10}(C(n))$. Chú ý rằng $$log_{10}{C(n)} = log_{10}{\frac{3 ^ {n + 1}}{2 ^ n}} = log_{10}{3^{n + 1}} - log_{10}{2^n} = (n + 1) * log_{10}3 - n * log_{10}2$$

Từ đây, ta dễ dàng tính được phần còn lại. Đồng thời, để tránh máy tính lại các hằng số $log_{10}{3}$ và $log_{10}{2}$ nhiều lần, ta có thể đặt các hằng số cho các kết quả này.

```python
lg3 = log10(3)
lg2 = log10(2)


def sochusocuaC(n: int) -> int:
    global lg3
    global lg2
    return floor((n + 1) * lg3 - n * lg2) + 1
```

```cpp
const double lg3 = log10(3), lg2 = log10(2);

int sochusocuaC(int n){
    return floor((n + 1) * lg3 - n * lg2) + 1;
}
```

ĐPT: $O(1)$

Đây là bài đăng đầu tiên của mình trên github, nếu có lỗi sai gì các bạn hãy góp ý nhé!

Tác giả: Hoàng Minh Đức / ducmatgoctoanlyhoa
