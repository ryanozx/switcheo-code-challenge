var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    return n % 2 ? n * ((n + 1) / 2) : (n / 2) * (n + 1); 
};

var sum_to_n_c = function(n) {
    let sum = 0;
    while (n >= 0) {
        sum += n;
        --n;
    }
    return sum;
};

console.log(sum_to_n_a(100000000));
console.log(sum_to_n_b(100000000));
console.log(sum_to_n_c(100000000));