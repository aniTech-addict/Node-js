#include <vector>
#include <iostream>
using namespace std;

int main() {
	vector<int> nums = {1,8,7,4,5};
	int max=0;
	int secMax;
	for(int i=0; i<size(nums); i++) {
		if(nums[i] > max) {
			secMax = max;
			max = nums[i];
		}else if ( nums[i] > secMax ){
			secMax = nums[i];
		}
	}
	cout<<"Second largest number = "<< secMax <<endl;
}
