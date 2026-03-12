#include <iostream>
#include <fstream>
#include <string>

int main() {
	bool exit = false;
	while(!exit) {
		std::ofstream outfile;
		int option;	
		std::string file;
		std::string content;

		std::cout<<"Menu:"<<std::endl;
		std::cout<<"1: Create File"<<std::endl;
		std::cout<<"2: Exit"<<std::endl;
		
		std::cin>>option;
		switch (option) {
			case 1:
			
		
				std::cin>>file;
				std::cin.ignore();
				std::getline(std::cin, content);
						
				outfile.open(file);
				outfile << content << std::endl;
				outfile.close();
				std::cout<<"File created"<<std::endl;

				break;
			case 2: 
				exit = true;
				break;	
		}
			
	}
}
