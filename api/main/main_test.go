package main

import "testing"

func TestMain(t *testing.T) {
	numbers := []int{1, 2, 3, 4, 5}
	expected := 15
	actual := 15

	if actual != expected {
		t.Errorf("Expected the sum of %v to be %d but instead got %d!", numbers, expected, actual)
	}
}
