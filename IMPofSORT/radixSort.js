function Queue() {
    this.dataStore = [];
    this.enqueue = function (element) {
        this.dataStore.push(element);
    };
    this.dequeue = function () {
        return this.dataStore.shift();
    };
    this.empty = function () {
        return this.dataStore.length === 0;
    };
}

function distribute(nums, queues, n, digit) {
    for (let i = 0; i < n; ++i) {
        if (digit === 1) {
            queues[nums[i] % 10].enqueue(nums[i]);
        } else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
        }
    }
}

function collect(queues, nums) {
    let i = 0;

    for (let digit = 0; digit < 10; ++digit) {
        while (!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue();
        }
    }
}

function radixSort(nums) {
    const queues = [];

    for (let i = 0; i < 10; ++i) {
        queues[i] = new Queue();
    }

    distribute(nums, queues, nums.length, 1);
    collect(queues, nums);

    distribute(nums, queues, nums.length, 10);
    collect(queues, nums);

    return nums;
}

const nums = [91, 46, 85, 15, 92, 35, 31, 22];

console.log(radixSort(nums)); //[15, 22, 31, 35, 46, 85, 91, 92]