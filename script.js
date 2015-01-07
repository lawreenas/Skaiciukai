
var module = angular.module("app", []);

module.controller("AppCtrl", ['$scope', '$timeout', 'Task',
    function ($scope, $timeout, Task) {
    $scope.started = false;
    $scope.answer = null;
    $scope.task = Task;

    $scope.items = [
        {color: 'green', icon: 'leaf', title: 'Žalia' },
        {color: 'red', icon: 'heart', title: 'Raudona' },
        {color: 'blue', icon: 'tint', title: 'Mėlyna' },
        {color: 'yellow', icon: 'star',title: 'Geltona' }
    ];

    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {

    }

    $scope.select = function(item) {
        var isCorrect = Task.ckeckAnswer(item);

        if (isCorrect) {
            $scope.answer = item;
            $timeout(
                function() {
                    $scope.newQuestion();
                }, 6000);
        } else {
            Task.playSound('/sounds/ne.mp3');
        }
    };

    $scope.newQuestion = function() {
        $scope.started = true;
        $scope.answer = null;
        Task.askQuestion();
    };
}]);

module.service('Task', [function() {

    this.tasks = [
        { question: 'Surask RAUDONĄ spalvą', answer: 'red' },
        { question: 'Surask GELTONĄ spalvą', answer: 'yellow' },
        { question: 'Surask ŽALIĄ spalvą', answer: 'green' },
        { question: 'Surask MĖLYNĄ spalvą', answer: 'blue' }
    ];
    this.activeTask = null;

    this.askQuestion = function() {
        this.activeTask = null;
        if (this.isGameFinished()) return;
        var randomQuestionNum = Math.floor( Math.random() * this.tasks.length );
        this.activeTask = this.tasks[randomQuestionNum];
        this.playSound('/spalvos/sounds/question-' + this.activeTask.answer + '.mp3');
        this.tasks.splice(randomQuestionNum, 1);
    };

    this.ckeckAnswer = function(answer) {
        if (answer.color === this.activeTask.answer) {
            this.playSound('/spalvos/sounds/answer-' + this.activeTask.answer + '.mp3');
            this.activeTask = null;
            return true;
        } else {
            return false;
        }
    };

    this.isGameFinished = function() {
        return this.tasks.length === 0 && this.activeTask === null;
    };

    this.playSound = function(url) {
        console.log('Playing: ' + url);
        new Audio(url).play();
    };

}]);
